package com.umc.study.rental.controller;

import com.umc.study.rental.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/rentals")
@RequiredArgsConstructor
public class RentalController {

    private final RentalService rentalService;

    @PostMapping
    public ResponseEntity<String> createRental(
            @RequestBody Map<String, Object> body
    ) {
        rentalService.createRental(body);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("도서 대여가 완료되었습니다!");
    }
}
