package pl.arproject.game.invitation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameInvitationRepository extends JpaRepository<GameInvitation, Long> {
    @Modifying
    @Query("DELETE FROM " +
            "GameInvitation gi " +
            "WHERE gi.sessionKey = ?1 ")
    void deleteBySessionKey(String sessionKey);

    List<GameInvitation> findAllByReceiverUsername(String username);
    Optional<GameInvitation> findBySessionKey(String sessionKey);
}
