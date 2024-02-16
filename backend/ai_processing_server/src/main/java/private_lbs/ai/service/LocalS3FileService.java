package private_lbs.ai.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

@Service
public class LocalS3FileService {
    public void createDirectory(String directoryPath) throws IOException {
        Path path = Paths.get(directoryPath);
        Files.createDirectories(path);
    }

    public void deleteDirectory(String directoryPath) throws IOException {
        Path startPath = Paths.get(directoryPath);
        // 시작 경로를 제외하고 하위 파일 및 폴더만 탐색 및 삭제
        try (Stream<Path> walk = Files.walk(startPath)) {
            walk.filter(path -> !path.equals(startPath)) // 시작 경로를 제외
                    .sorted(Comparator.reverseOrder()) // 역순으로 정렬
                    .map(Path::toFile) // Path 객체를 File 객체로 변환
                    .forEach(File::delete); // 각 File 객체 삭제
        }
    }

    public List<String> getFileNames(String localFilePath) {
        File directory = new File(localFilePath);
        File[] files = directory.listFiles();
        List<String> fileNames = new ArrayList<>();

        if (files != null) {
            for (File file : files) {
                if (file.isFile()) {
                    fileNames.add(file.getName());
                }
            }
        }

        return fileNames;
    }
}
