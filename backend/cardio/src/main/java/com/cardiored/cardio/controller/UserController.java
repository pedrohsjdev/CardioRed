package com.cardiored.cardio.controller;

import com.cardiored.cardio.domain.User;
import com.cardiored.cardio.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("users")
public class UserController {

    private final UserService userService;

    @PostMapping(path = "/find")
    public ResponseEntity<User> findByLoginAndPassword(User user){
        return ResponseEntity.ok(userService.findUserByLoginAndPassword(user));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<User> findById(@PathVariable Integer id){
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping
    public ResponseEntity<User> save(@RequestBody @Valid User user){
        return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<User> replace(@RequestBody User user){
        userService.replace(user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
