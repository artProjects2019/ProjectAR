package pl.arproject.friend;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import pl.arproject.appuser.AppUser;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Table(name = "friends")
@Entity(name = "Friend")
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "first_user_id", referencedColumnName = "id")
    AppUser firstUser;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "second_user_id", referencedColumnName = "id")
    AppUser secondUser;

    public Friend(AppUser firstUser, AppUser secondUser) {
        this.firstUser = firstUser;
        this.secondUser = secondUser;
    }
}
