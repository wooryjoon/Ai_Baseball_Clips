package private_lbs.ai.domain;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@NotNull
@Setter
@Getter
@Slf4j
@AllArgsConstructor
@NoArgsConstructor
public class BatInfoFromFileName implements Comparable<BatInfoFromFileName> {
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
    // 몇번째 타석인지
    private int atBatOrder;

    public BatInfoFromFileName(String fileKey, String[] splits) {
        this.fileKey = fileKey;
        this.requestId = Integer.parseInt(splits[splits.length - 5]);
        this.pitcherId = Integer.parseInt(splits[splits.length - 4]);
        this.hitterId = Integer.parseInt(splits[splits.length - 3]);
        this.atBatOrder = Integer.parseInt(splits[splits.length - 2]);

        log.info("fileKey : {}", fileKey);
        log.info("requestId : {}", requestId);
        log.info("pitcherID : {} ", pitcherId);
        log.info("hitterId: {}", hitterId);
        log.info("atBatOrder: {} ", atBatOrder);
    }

    @Override
    public int compareTo(BatInfoFromFileName o) {
        return this.getAtBatOrder() - o.getAtBatOrder();
    }
}
