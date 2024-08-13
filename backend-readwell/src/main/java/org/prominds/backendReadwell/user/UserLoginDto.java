package org.prominds.backendReadwell.user;

import lombok.Getter;
import lombok.Setter;

public class UserLoginDto {
    @Getter
    @Setter
    private String email;

    @Getter
    @Setter
    private String password;

    @Getter
    @Setter
    private String otp;
}
