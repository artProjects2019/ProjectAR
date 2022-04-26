package pl.arproject.friend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.arproject.appuser.AppUser;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
    boolean existsByFirstUserAndSecondUser(AppUser firstUser, AppUser secondUser);
}
