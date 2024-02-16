package com.private_lbs.taskmaster.global.auth;

import com.private_lbs.taskmaster.member.domain.Role;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Auth {
    Role role() default Role.GUEST;
}
