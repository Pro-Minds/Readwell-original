package org.prominds.backendReadwell.otp;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GeneratedOtpRepository extends JpaRepository<GeneratedOtp, Long> {
    GeneratedOtp findByEmail(String email);
}
