package com.klef.devops.service;

import java.util.List;

import com.klef.devops.model.Voter;

public interface VoterService {
	public String addvoter(Voter v);
	public List<Voter> getall();
	public Voter getvoter(int id);
}
