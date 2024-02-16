package com.private_lbs.taskmaster.S3.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class EventNotification {
    @JsonProperty("Records")
    private List<EventRecord> records;
}
