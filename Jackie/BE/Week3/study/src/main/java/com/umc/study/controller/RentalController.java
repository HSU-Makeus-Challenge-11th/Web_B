// src/main/java/.../controller/BookController.java
package com.umc.study.controller;

import com.umc.study.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rentals")
@RequiredArgsConstructor
public class RentalController {

    // 주방장(Service)을 주입받아 카운터 옆에 대기시킵니다.
    private final RentalService RentalService;

    // 3. HTTP GET 방식으로 /books 요청이 들어왔을 때 이 메서드가 실행됩니다.
    @GetMapping
    public List<Map<String, Object>> getRental() {
        return RentalService.getRental();
    }

    // POST http://localhost:8080/books
    @PostMapping
    public String createRental(@RequestBody Map<String, Object> body){
        RentalService.createRental(body);
        return "대여기록 등록이 완료되었습니다!";
    }
}