package com.klef.devops.controller;

import java.net.http.HttpRequest;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.klef.devops.model.Voter;
import com.klef.devops.repository.VoterRepo;
import com.klef.devops.service.VoterServiceImpl;

@RestController
@CrossOrigin(origins ="*")
public class VoterController {
	
	@Autowired
	private VoterServiceImpl vs;
	
	@Autowired
	private VoterRepo vr;
	
	@GetMapping("/")
	public String home() {
		return "BACKEND IS WORKING";
	}
	
	@PostMapping("/add")
	public String addvoter(@RequestBody Voter v) {
		if(vr.existsByNumber(v.getNumber())) {
			return "Number is already in use";
		}
		if(vr.existsById(v.getId())) {
			return "ID is already taken";
		}
		vs.addvoter(v);
		return "Voter added";
		
	}
	
	@GetMapping("/all")
	public List<Voter> getMethodName() {
		return vs.getall();
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<?> getMethodName(@PathVariable int id) {
		Voter v=vs.getvoter(id);
		if(v==null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( "Voter is not found with id :"+id);
		}
		return ResponseEntity.ok(v);
		
	}
	
	
	
	
}
