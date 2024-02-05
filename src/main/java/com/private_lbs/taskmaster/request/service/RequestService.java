package com.private_lbs.taskmaster.request.service;

import com.private_lbs.taskmaster.S3.data.vo.OriginUrl;
import com.private_lbs.taskmaster.member.domain.Member;
import com.private_lbs.taskmaster.request.domain.Request;
import com.private_lbs.taskmaster.request.domain.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URL;

@Transactional
@RequiredArgsConstructor
@Service
public class RequestService {
    private final RequestRepository requestRepository;
    public Request save(Member member) {
        return requestRepository.save(new Request(member));
    }

    public void setUrls(Request request, OriginUrl originUrl, URL presignedUrl) {
        request.setUrl(originUrl.toString());
        request.setPresignedUrl(presignedUrl.toString());
    }

}
