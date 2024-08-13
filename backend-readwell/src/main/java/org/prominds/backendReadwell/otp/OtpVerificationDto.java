package org.prominds.backendReadwell.otp;

import lombok.Getter;
import lombok.Setter;

public class OtpVerificationDto {
    @Getter
    @Setter
    private String email;

    @Getter
    @Setter
    private String otp;
}
