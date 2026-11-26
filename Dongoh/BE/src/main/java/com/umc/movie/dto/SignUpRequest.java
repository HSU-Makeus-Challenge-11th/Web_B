package com.umc.movie.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.nio.charset.StandardCharsets;

public record SignUpRequest(
        @Schema(description = "로그인에 사용할 이메일", example = "challenger@umc.com")
        @NotBlank(message = "이메일을 입력해주세요.")
        @Email(message = "올바른 이메일 형식이 아닙니다.")
        @Size(max = 254, message = "이메일은 254자 이하로 입력해주세요.")
        String email,

        @Schema(description = "대문자/소문자/숫자/특수문자를 포함한 8자 이상", example = "Umc1234!")
        @NotBlank(message = "비밀번호를 입력해주세요.")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$",
                message = "비밀번호는 대문자/소문자/숫자/특수문자(!@#$%^&*)를 포함한 8자 이상이어야 합니다.")
        String password,

        @Schema(description = "2자 이상 12자 이하의 닉네임", example = "영화조아")
        @NotBlank(message = "닉네임을 입력해주세요.")
        @Size(min = 2, max = 12, message = "닉네임은 2자 이상 12자 이하로 입력해주세요.")
        String nickname
) {
    @AssertTrue(message = "비밀번호는 UTF-8 기준 72바이트 이하로 입력해주세요.")
    public boolean isPasswordWithinBcryptLimit() {
        return password == null || password.getBytes(StandardCharsets.UTF_8).length <= 72;
    }
}
