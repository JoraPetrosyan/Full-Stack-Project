package org.example.userservice.service;

import lombok.RequiredArgsConstructor;
import org.example.userservice.dto.AuthResponseDto;
import org.example.userservice.dto.LoginDto;
import org.example.userservice.dto.SaveUserDto;
import org.example.userservice.dto.UserDto;
import org.example.userservice.entity.User;
import org.example.userservice.mapper.UserMapper;
import org.example.userservice.repasitory.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto register(SaveUserDto dto) {

        if (userRepository.findByEmail(dto.email()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = userMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public AuthResponseDto login(LoginDto dto) {
        User user = userRepository.findByEmail(dto.email())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(dto.password(), user.getPassword())) {
            throw new RuntimeException("Wrong password");
        }
        return new AuthResponseDto(jwtService.generateToken(dto.email()));
    }

    @Override
    public UserDto getById(Long id) {
        return userMapper.toDto(userRepository.findById(id).orElseThrow());
    }

    @Override
    public Page<UserDto> getAll(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(userMapper::toDto);
    }
}
