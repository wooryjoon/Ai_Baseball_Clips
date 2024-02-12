package private_lbs.ai.domain;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NotNull
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Bat {
    //요청아이디
    private int requestId;
    // 투수아아디
    private int pitcherId;
    // 타자아이디
    private int hitterId;
    //파일키
    private String fileKey;
    // 이닝
    private int inning;
    // 몇번 타자인지
    private int battingOrder;
    // 몇번째 타석인지
    private int atBatOrder;
}
