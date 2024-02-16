package com.private_lbs.taskmaster.request.domain.repository;

import com.private_lbs.taskmaster.request.domain.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Long> {
}
