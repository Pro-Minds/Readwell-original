package org.prominds.backendReadwell.user;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserRegistrationDto {
    private String email;
    private String password;
}
