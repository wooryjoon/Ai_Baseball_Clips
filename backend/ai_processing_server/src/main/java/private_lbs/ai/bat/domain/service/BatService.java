package private_lbs.ai.bat.domain.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import private_lbs.ai.bat.domain.Bat;
import private_lbs.ai.bat.domain.repository.BatRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BatService {

    private final BatRepository batRepository;

    @Transactional
    public void saveBats(List<Bat> bats) {
        batRepository.saveAll(bats);
    }

}
