package com.klef.devops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.devops.model.Voter;

@Repository
public interface VoterRepo extends JpaRepository<Voter,Integer> {
	public boolean existsByNumber(String number);
	

}
