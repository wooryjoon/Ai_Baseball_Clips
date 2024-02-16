package private_lbs.ai.bat.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import private_lbs.ai.domain.BaseEntity;
import private_lbs.ai.domain.BatInfoFromFileName;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bat extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bat_id", nullable = false)
    private Long id;
    private long requestId;
    private String processedVideo;
    private long hitterId;
    private long pitcherId;
    private int inning;

    public Bat(BatInfoFromFileName batInfoFromFileName, int inning) {
        requestId = batInfoFromFileName.getRequestId();
        processedVideo = batInfoFromFileName.getFileKey();
        hitterId = batInfoFromFileName.getHitterId();
        pitcherId = batInfoFromFileName.getPitcherId();
        this.inning = inning;
    }
}