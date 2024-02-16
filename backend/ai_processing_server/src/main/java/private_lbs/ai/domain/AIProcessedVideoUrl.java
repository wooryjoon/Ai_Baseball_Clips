package private_lbs.ai.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AIProcessedVideoUrl {
    private String bucketName;
    // 가공된 많은 영상의 url이 sub되므로 List로 구현
    private List<String> filekeys;
}
