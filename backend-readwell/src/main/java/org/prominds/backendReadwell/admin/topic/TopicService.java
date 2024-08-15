package org.prominds.backendReadwell.admin.topic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {
    @Autowired
    private TopicRepository topicRepository;

    public Topic createTopic(Topic newTopic) {
        return topicRepository.save(newTopic);
    }

    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public void deleteTopic(Long id) {
        topicRepository.deleteById(id);
    }

    public Topic updateTopic(Long id, Topic updatedTopic) {
        updatedTopic.setId(id);
        return topicRepository.save(updatedTopic);
    }
}

