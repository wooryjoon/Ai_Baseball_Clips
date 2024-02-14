package com.private_lbs.taskmaster.S3.controller;

import com.amazonaws.services.s3.model.PartETag;
import com.private_lbs.taskmaster.S3.data.dto.CompleteUploadRequest;
import com.private_lbs.taskmaster.S3.data.dto.EventNotification;
import com.private_lbs.taskmaster.S3.data.dto.EventRecord;
import com.private_lbs.taskmaster.S3.data.vo.OriginUrl;
import com.private_lbs.taskmaster.S3.service.S3Service;
import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.member.service.MemberService;
import com.private_lbs.taskmaster.redis.service.RedisPubService;
import com.private_lbs.taskmaster.redis.service.SseEmitters;
import com.private_lbs.taskmaster.request.domain.Request;
import com.private_lbs.taskmaster.request.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/S3")
@RequiredArgsConstructor
public class S3Controller {

    private final RedisPubService redisPubService;
    private final RequestService requestService;
    private final MemberService memberService;
    private final S3Service s3Service;
    private final SseEmitters sseEmitters;


    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(){
        System.out.println("서브스크라이브 단");
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        sseEmitters.addEmitter(emitter);

        emitter.onCompletion(() -> sseEmitters.removeEmitter(emitter));
        emitter.onTimeout(() -> sseEmitters.removeEmitter(emitter));
        emitter.onError((e) -> sseEmitters.removeEmitter(emitter));

        return emitter;
    }

    // 클라이언트로부터 AWS S3 사전 서명된 URL 생성 요청을 처리
    @GetMapping("/generate-url")
    public ResponseEntity<String> generatePresignedUrl(@RequestParam String filename){

        Member member = memberService.getCurrentMember();
        Request request = requestService.save(member);

        long durationMillis = 100000 * 60;

        OriginUrl originUrl = s3Service.makeOriginUrl(filename, member.getId(), request.getId());
        URL presignedUrl = s3Service.generatePresignedUrl(originUrl.getFileKey(), durationMillis);

        requestService.setUrls(request, originUrl, presignedUrl);
        return ResponseEntity.ok(presignedUrl.toString());
    }



    // AWS S3에서 파일 업로드 이벤트 수신 및 AI 서버가 SUB 중인 채널로 전송
    @PostMapping("/endpoint")
    public ResponseEntity<Void> receiveFileUrl(@RequestBody EventNotification notification){
        System.out.println("endPoint 들어옴");
        for (EventRecord record : notification.getRecords()) {
            OriginUrl originUrl = OriginUrl.makeUrlFromEventRecord(record);
            if (originUrl.getFileKey().split("/").length == 3 && !originUrl.getFileKey().contains("\\")) {
                redisPubService.sendMessage(originUrl);
                sseEmitters.sendMessage2("s3 영상 업로드 완료!");
            }
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }



    @GetMapping("/generate-multiparturl")
    public ResponseEntity<?> generateUrl(@RequestParam String filename, @RequestParam Long filesize) {
//        System.out.println("요청");
//        System.out.println(filename+"  "+filesize);
        Member member = memberService.getCurrentMember();
        Request request = requestService.save(member);
        System.out.println("filename = "+filename+" filesize = "+filesize+ " memberID = "+member.getId()+" requestId = "+request.getId());
        Map<String, Object> response = s3Service.createMultipartUploadUrls(filename, filesize, member.getId(), request.getId());
        return ResponseEntity.ok(response);
    }

    // 업로드 완료 요청 처리
    @PostMapping("/complete-upload")
    public ResponseEntity<?> completeUpload(@RequestBody CompleteUploadRequest completeUploadRequest) {
        System.out.println("completeUploadRequest.getUploadId() = "+completeUploadRequest.getUploadId());
        System.out.println("completeUploadRequest.getParts() = "+completeUploadRequest.getParts());


        // 'completeUploadRequest'의 'parts' 리스트를 스트림으로 변환한 후,
        // 각 'part' 객체를 'PartETag' 객체로 매핑하고, 최종적으로 리스트로 수집합니다.
        List<PartETag> partETags = completeUploadRequest.getParts().stream()
                .map(part -> new PartETag(part.getPartNumber(), part.getEtag()))
                .collect(Collectors.toList());
        System.out.println("PartETags:");
        for (PartETag partETag : partETags) {
            System.out.println("Part Number: " + partETag.getPartNumber() + ", ETag: " + partETag.getETag());
        }
        s3Service.completeMultipartUpload(completeUploadRequest.getUploadId(),partETags);
        return ResponseEntity.ok().build();
    }




}
