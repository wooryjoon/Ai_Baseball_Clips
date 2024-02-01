package com.private_lbs.taskmaster.member.domain;

import com.private_lbs.taskmaster.request.domain.Request;
import com.private_lbs.taskmaster.global.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Long id;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Request> requests = new ArrayList<>();

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password")
    private String password;

}
