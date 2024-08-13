package org.prominds.backendReadwell.user;

import lombok.Getter;
import lombok.Setter;

public class UserRegistrationDto {
    @Getter
    @Setter
    private String email;
    @Getter
    @Setter
    private String password;
}
