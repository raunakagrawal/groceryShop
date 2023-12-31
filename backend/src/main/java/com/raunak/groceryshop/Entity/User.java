package com.raunak.groceryshop.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Email is required")
    @Column(nullable = false, unique = true, length = 45)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Column(nullable = false, length = 64)
    private String password;

    @NotBlank(message = "First name is required")
    @Size(max = 20, message = "First name must be at most 20 characters long")
    @Column(name = "fname", nullable = false, length = 20)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 20, message = "Last name must be at most 20 characters long")
    @Column(name = "Lname", nullable = false, length = 20)
    private String lastName;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]+$", message = "Mobile number must contain only digits")
    @Size(max = 10, message = "Invalid Mobile Number")
    @Column(name = "p_number", nullable = false, length = 20)
    private String mobileNo;

    @NotBlank(message = "Gender is required")
    @Size(max = 1, message = "Invalid Gender")
    @Column(name = "gender", nullable = false, length = 20)
    private String gender;
    
    @NotBlank(message = "Date of birth is required")
    @Column(name = "dob", nullable = false, length = 20)
    private String dob;

    @NotBlank(message = "Role is required")
    @Size(max = 20, message = "Role must be Integer")
    @Column(name = "role", nullable = false, length = 20)
    private String role;

    @Transient
    private String passwordConfirm;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getDob() {

		return dob;
	}

	public void setDob(String birthDate) {
		this.dob = birthDate;
	}
	public String getRole() {

		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPasswordConfirm() {
		return passwordConfirm;
	}

	public void setPasswordConfirm(String passwordConfirm) {
		this.passwordConfirm = passwordConfirm;
	}
}
