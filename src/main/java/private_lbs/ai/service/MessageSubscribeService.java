package private_lbs.ai.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import private_lbs.ai.domain.AIProcessedVideoUrl;
import private_lbs.ai.domain.Bat;
import private_lbs.ai.domain.OriginalVideoLocalPath;
import private_lbs.ai.domain.OriginalVideoUrl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageSubscribeService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    private final S3FileService S3FileService;
    private final MessagePublishService MessagePublishService;
    private final LocalS3FileService LocalS3FileService;
    public void processOriginalVideoLocalPath(OriginalVideoLocalPath OriginalVideoLocalPath) throws IOException {
        String originalVideoLocalPath=OriginalVideoLocalPath.getLocalPath();
        // 로컬 경로에 접근해 파일명 저장
        List<String> FileNames=LocalS3FileService.getFileNames(originalVideoLocalPath);



        log.info("AI Model 에서 가공 완료된 영상 위치 " + OriginalVideoLocalPath.getLocalPath());
        for(String fileName:FileNames){

            // 파일 이름 "_" 단위로 쪼개기
            String[] parts=fileName.split("__");
            log.info(fileName);

            //원본 영상은 걸러내기
            if(parts.length==1) {
                continue;
            }

            String fileKey=S3FileService.buildFileKey(originalVideoLocalPath,parts);

            String[] splits=fileKey.split("/");

            // s3에 업로드.
            S3FileService.uploadFile(fileKey,new File(originalVideoLocalPath,fileName));

            Bat bat=new Bat();
            // 파일키 설정.
            bat.setFileKey(fileKey);
            // 몇번 타자인지
            bat.setBattingOrder(Integer.parseInt(splits[splits.length-1]));
            // 타석번호
            bat.setAtBatOrder(Integer.parseInt(splits[splits.length-2]));
            // 타자 아이디
            bat.setHitterId(Integer.parseInt(splits[splits.length-3]));
            // 투수 아이디
            bat.setPitcherId(Integer.parseInt(splits[splits.length-4]));
            // requestId
            bat.setRequestId(Integer.parseInt(splits[splits.length-6]));

            // DB에 저장 로직.

            // Dto requestId, 투수 아이디. 타자아이디. 이닝, filekey, 타석번호,
            // 투수아이디_타자아이디_타석번호_몇번타자인지

        }
        //로컬 폴더 삭제
        //LocalS3FileService.deleteDirectory(originalVideoLocalPath);
        //MessagePublishService.publishEvent2(new AIProcessedVideoUrl(bucketName,fileKeys));
    }
    // 요청 처리 서버로 부터 S3 url 수신
    public void processOriginalVideoUrl(OriginalVideoUrl OriginalVideoUrl) throws IOException {

        String fileKey=OriginalVideoUrl.getFileKey();
        String bucketName=OriginalVideoUrl.getBucket();

        log.info("S3 잘 저장됐고 Redis에서 메시지 잘 넘어왔나? (요청 -> AI)");
        // TODO : 우선은 내 로컬 경로지만 추 후 수정 필요.
        String localPath="/home/video";

        String[] paths= fileKey.split("/");

        // 로컬에 생성해줄 디렉토리 경로
        String createDirectoryPath=localPath+File.separator+paths[0]+File.separator+paths[1];

        String filePath=createDirectoryPath+File.separator+paths[2];
        log.info("로컬경로 = "+filePath+"  파일키 = "+fileKey);
        log.info("createDirectoryPath : " + createDirectoryPath);
        // 원본 영상 저장 폴더 생성.
        LocalS3FileService.createDirectory(filePath);
        // 생성한 폴더에 영상 저장
        S3FileService.downloadFile(bucketName,fileKey,filePath);
        // Redis ch3으로 pub
        MessagePublishService.publishEvent3(new OriginalVideoLocalPath(createDirectoryPath));
    }
}

