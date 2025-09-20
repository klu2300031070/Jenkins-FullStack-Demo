package com.my.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.my.demo.model.Faculty;



@Repository
public interface FacultyRepo extends JpaRepository<Faculty, Integer>{

}
