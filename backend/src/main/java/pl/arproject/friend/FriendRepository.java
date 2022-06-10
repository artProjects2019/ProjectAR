package pl.arproject.friend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.arproject.appuser.AppUser;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
    boolean existsByFirstUserAndSecondUser(AppUser firstUser, AppUser secondUser);
    Optional<Friend> findByFirstUserAndSecondUser(AppUser firstUser, AppUser secondUser);

    @Query("SELECT f.secondUser FROM Friend f " +
            "WHERE f.firstUser.id = ?1 ")
    List<AppUser> findSecondUserByFirstUserId(Long userId);

    @Query("SELECT f.firstUser FROM Friend f " +
            "WHERE f.secondUser.id = ?1 ")
    List<AppUser> findFirstUserBySecondUserId(Long userId);
}
