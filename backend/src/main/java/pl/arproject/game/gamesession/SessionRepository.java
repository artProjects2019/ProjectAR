package pl.arproject.game.gamesession;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    Optional<Session> findBySessionKey(String sessionKey);

    @Modifying
    @Query("DELETE FROM " +
            "Session s " +
            "WHERE s.sessionKey = ?1 ")
    void deleteBySessionKey(String sessionKey);
}
