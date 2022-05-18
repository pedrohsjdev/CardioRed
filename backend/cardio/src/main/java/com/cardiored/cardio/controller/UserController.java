package com.cardiored.cardio.controller;

import com.cardiored.cardio.domain.Role;
import com.cardiored.cardio.domain.User;
import com.cardiored.cardio.request.user.UserPostDTO;
import com.cardiored.cardio.request.user.UserPutDTO;
import com.cardiored.cardio.service.UserService;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(path = "/find")
    public ResponseEntity<User> findByUsername(@RequestBody String username) {
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<User> findById(@PathVariable Integer id){
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<Void> save(@RequestBody @Valid UserPostDTO userPostDTO){
        userService.save(userPostDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/role/save")
    public ResponseEntity<Void> saveRole(@RequestBody Role role){
        userService.saveRole(role);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<Void> addRoleToUser(@RequestBody RoleToUserForm form){
        userService.addRoleToUser(form.getUsername(), form.getRolename());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody UserPutDTO userPutDTO){
        userService.replace(userPutDTO);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(path = "/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        userService.refreshToken(request, response);
    }
    
}

@Data
class RoleToUserForm {
    private String username;
    private String rolename;
}