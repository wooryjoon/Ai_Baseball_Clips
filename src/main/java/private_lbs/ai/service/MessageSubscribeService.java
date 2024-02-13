package private_lbs.ai.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import private_lbs.ai.bat.domain.Bat;
import private_lbs.ai.bat.domain.service.BatService;
import private_lbs.ai.domain.BatInfoFromFileName;
import private_lbs.ai.domain.OriginalVideoLocalPath;
import private_lbs.ai.domain.OriginalVideoUrl;
import private_lbs.ai.pitcher.domain.Pitcher;
import private_lbs.ai.pitcher.domain.repository.PitcherRepository;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageSubscribeService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    private final S3FileService S3FileService;
    private final MessagePublishService MessagePublishService;
    private final LocalS3FileService LocalS3FileService;
    private final PitcherRepository pitcherRepository;
    private final BatService batService;

    public void processOriginalVideoLocalPath(OriginalVideoLocalPath OriginalVideoLocalPath) throws IOException {

        String originalVideoLocalPath = OriginalVideoLocalPath.getLocalPath();
        // 로컬 경로에 접근해 파일명 저장
        List<String> FileNames = LocalS3FileService.getFileNames(originalVideoLocalPath);

        List<BatInfoFromFileName> batInfoFromFileNames = new ArrayList<>();


        log.info("AI Model 에서 가공 완료된 영상 위치 " + OriginalVideoLocalPath.getLocalPath());
        String requestId=OriginalVideoLocalPath.getLocalPath().split("/")[4];
        for (String fileName : FileNames) {

            // 파일 이름 "_" 단위로 쪼개기
            String[] parts = fileName.split("__");
            log.info(fileName);

            //원본 영상은 걸러내기
            if (parts.length == 1) {
                continue;
            }

            String fileKey = S3FileService.buildFileKey(originalVideoLocalPath, parts);
            System.out.println("fileKey : "+fileKey);
            String[] splits = fileKey.split("/");

            // s3에 업로드.
            S3FileService.uploadFile(fileKey, new File(originalVideoLocalPath, fileName));
            // 저장
            batInfoFromFileNames.add(new BatInfoFromFileName(fileKey, splits));
        }
        Collections.sort(batInfoFromFileNames);
        saveBat(batInfoFromFileNames);

        MessagePublishService.publishEvent2("100");
        MessagePublishService.publishEvent2(requestId);
        //로컬 폴더 삭제
        //LocalS3FileService.deleteDirectory(originalVideoLocalPath);
        //MessagePublishService.publishEvent2(new AIProcessedVideoUrl(bucketName,fileKeys));
    }
    // 요청 처리 서버로 부터 S3 url 수신
    public void processOriginalVideoUrl(OriginalVideoUrl OriginalVideoUrl) throws IOException {

        String fileKey = OriginalVideoUrl.getFileKey();
        String bucketName = OriginalVideoUrl.getBucket();

        log.info("S3 잘 저장됐고 Redis에서 메시지 잘 넘어왔나? (요청 -> AI)");
        // TODO : 우선은 내 로컬 경로지만 추 후 수정 필요.
        String localPath = "/home/video";

        String[] paths = fileKey.split("/");

        // 로컬에 생성해줄 디렉토리 경로
        String createDirectoryPath = localPath + File.separator + paths[0] + File.separator + paths[1];

        String filePath = createDirectoryPath + File.separator + paths[2];
        log.info("로컬경로 = " + filePath + "  파일키 = " + fileKey);
        log.info("createDirectoryPath : " + createDirectoryPath);
        // 원본 영상 저장 폴더 생성.
        LocalS3FileService.createDirectory(filePath);
        // 생성한 폴더에 영상 저장
        S3FileService.downloadFile(bucketName, fileKey, filePath);

        // Redis ch3으로 pub
        MessagePublishService.publishEvent3(new OriginalVideoLocalPath(createDirectoryPath));
    }


    private Map<Long, Long> getPitcherIdAndTeamIdMap() {
        return pitcherRepository.findAll().stream().
                collect(Collectors.toMap(Pitcher::getId, pitcher -> pitcher.getTeam().getId()));
    }

    private void saveBat(List<BatInfoFromFileName> batInfoFromFileNames) {
        List<Bat> bats = new ArrayList<>();
        Map<Long, Long> pitcherIdAndTeamIdMap = getPitcherIdAndTeamIdMap();

        int inning = 0;
        long startTeamId = 0;
        for (BatInfoFromFileName batInfoFromFileName : batInfoFromFileNames) {
            long pitcherId = batInfoFromFileName.getPitcherId();
            long teamId = pitcherIdAndTeamIdMap.get(pitcherId);
            if (startTeamId != teamId) {
                inning++;
                startTeamId = teamId;
            }
            bats.add(new Bat(batInfoFromFileName, inning));
        }
        batService.saveBats(bats);
    }
}

