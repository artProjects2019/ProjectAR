package pl.arproject.appuser;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "users")
@Entity(name = "AppUser")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private AppUserRole role;

    @Column(name = "locked")
    private boolean locked = false;

    @Column(name = "enabled")
    private boolean enabled = false;

    public AppUser(String username, String password, String email, AppUserRole role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public boolean equalsExceptIdAndPassword(Object o) {
        if (this == o) return true;
        if (!(o instanceof AppUser)) return false;
        AppUser appUser = (AppUser) o;
        return isLocked() == appUser.isLocked() &&
                isEnabled() == appUser.isEnabled() &&
                getUsername().equals(appUser.getUsername()) &&
                getEmail().equals(appUser.getEmail()) &&
                getRole() == appUser.getRole();
    }
}
