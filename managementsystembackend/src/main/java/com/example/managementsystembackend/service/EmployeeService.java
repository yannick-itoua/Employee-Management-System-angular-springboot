package com.example.managementsystembackend.service;

import com.example.managementsystembackend.model.Employee;
import com.example.managementsystembackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Méthode pour récupérer les employés avec pagination
    public Page<Employee> getEmployees(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }

    // Méthode pour rechercher des employés
    public Page<Employee> searchEmployees(String search, Pageable pageable) {
        return employeeRepository.findByFirstNameContainingOrLastNameContaining(search, search, pageable);
    }

    // Méthode pour récupérer un employé par ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // Méthode pour enregistrer un employé
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Méthode pour supprimer un employé par ID
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
