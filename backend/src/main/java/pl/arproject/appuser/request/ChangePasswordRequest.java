package pl.arproject.appuser.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ChangePasswordRequest {
    private String username;
    private String newPassword;
    private String repeatPassword;
}
