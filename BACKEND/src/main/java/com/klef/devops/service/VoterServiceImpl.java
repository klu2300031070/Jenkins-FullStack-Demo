package com.klef.devops.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.devops.model.Voter;
import com.klef.devops.repository.VoterRepo;
@Service
public class VoterServiceImpl implements VoterService {

	@Autowired
	private VoterRepo vr;
	
	@Override
	public String addvoter(Voter v) {
		vr.save(v);
		return "Added";
	}

	@Override
	public List<Voter> getall() {
		return vr.findAll();
	}

	@Override
	public Voter getvoter(int id) {
		Voter v=vr.findById(id).orElse(null);
		return v;
	}

}
