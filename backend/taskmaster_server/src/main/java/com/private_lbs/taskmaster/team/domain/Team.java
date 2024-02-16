package com.private_lbs.taskmaster.team.domain;

import com.private_lbs.taskmaster.global.domain.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RequiredArgsConstructor
@Getter
@Entity
public class Team extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id", nullable = false)
    private Long id;

    @Size(max = 50)
    @NonNull
    @Column(length = 50)
    private String name;

    @Column(name = "image_url" ,length = 255)
    private String imageUrl;

}