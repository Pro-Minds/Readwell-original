package org.prominds.backendReadwell.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserLoginDto {
    private String email;

    private String password;

    private String otp;
}
