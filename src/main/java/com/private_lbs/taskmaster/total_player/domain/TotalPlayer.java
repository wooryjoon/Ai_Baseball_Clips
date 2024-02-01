package com.private_lbs.taskmaster.total_player.domain;

import com.private_lbs.taskmaster.global.domain.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class TotalPlayer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "total_player_id", nullable = false)
    private Long id;

    @NotNull
    @Column(length = 100)
    private String name;
}
