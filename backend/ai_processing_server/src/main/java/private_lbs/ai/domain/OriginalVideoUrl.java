package private_lbs.ai.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
// 요청처리서버로 부터 받은 데이터 저장.
public class OriginalVideoUrl {
    private String fileKey;
    private String bucket;

}

