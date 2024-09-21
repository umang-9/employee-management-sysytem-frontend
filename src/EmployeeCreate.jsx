import { Form, Row, Col, Button, Card, CardBody, CardTitle } from 'react-bootstrap';
import graphQLFetch from './GraphQLFetch.js';

export default class EmployeeCreate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			firstNameError: '',
			lastName: '',
			lastNameError: '',
			age: 0,
			ageError: '',
			dateOfJoining: '',
			dateOfJoiningError: '',
			title: '',
			titleError: '',
			department: '',
			departmentError: '',
			employeeType: 'FullTimeEmployee',
			employeeTypeError: '',
			currentStatus: true,
		};
	}

	async handleSubmit(e) {
		e.preventDefault();

		// validation
		if (this.state.firstName.length < 2) {
			this.setState({ firstNameError: 'Please enter a valid name!' });
		}
		if (this.state.lastName.length < 2) {
			this.setState({ lastNameError: 'Please enter a valid name!' });
		}
		if (this.state.age <= 19 || this.state.age >= 80) {
			this.setState({ ageError: 'Please enter a valid age between 19 and 80.' });
			return;
		}
		if (this.state.dateOfJoining == '') {
			this.setState({ dateOfJoiningError: 'Please enter a valid date!' });
			return;
		}
		if (this.state.title.length < 2) {
			this.setState({ titleError: 'Please enter a valid title!' });
			return;
		}
		if (this.state.department.length < 2) {
			this.setState({ departmentError: 'Please enter a valid department name!' });
			return;
		}
		if (this.state.employeeType.length < 2) {
			this.setState({ employeeTypeError: 'Please enter employee type!' });
			return;
		}

		const employee = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			age: this.state.age,
			dateOfJoining: this.state.dateOfJoining,
			title: this.state.title,
			department: this.state.department,
			employeeType: this.state.employeeType,
			currentStatus: this.state.currentStatus,
		};

		const query = `
			mutation employeeAdd($employee: EmployeeInputs) {
				employeeAdd(employee: $employee) {
					firstName lastName age dateOfJoining title department employeeType currentStatus
				}
			}
		`;

		const data = await graphQLFetch(query, { employee });
		if (data) {
			this.setState({
				firstName: '',
				firstNameError: '',
				lastName: '',
				lastNameError: '',
				age: 0,
				ageError: '',
				dateOfJoining: '',
				dateOfJoiningError: '',
				title: '',
				titleError: '',
				department: '',
				departmentError: '',
				employeeType: 'FullTimeEmployee',
				employeeTypeError: '',
				currentStatus: true,
			});

			alert('A new employee is added!');
		}
	}

	render() {
		return (
			<React.Fragment>
				<Row className='justify-content-center mt-5 mb-5'>
					<Col xs={12} sm={12} md={6} lg={6}>
						<Card className='bg-secondary-subtle'>
						<CardTitle className='bg-primary px-4 py-3'>
								<h2 className='mb-0 text-white'>Add a new employee</h2>
							</CardTitle>

							<CardBody className='p-4'>
								<Form
									onSubmit={async (e) => {
										this.handleSubmit(e);
									}}>
									

									{/* firstName */}
									<div className='mb-3'>
										<Form.Label htmlFor='firstName' className='form-label'>
											First name
										</Form.Label>
										<Form.Control
											type='text'
											className='form-control form-control-sm'
											id='firstName'
											onChange={(e) => {
												this.setState({ firstName: e.target.value, firstNameError: '' });
											}}
											value={this.state.firstName}
										/>
										<small className='text-danger'>{this.state.firstNameError}</small>
									</div>

									{/* lastName */}
									<div className='mb-3'>
										<Form.Label htmlFor='lastName' className='form-label'>
											Last name
										</Form.Label>
										<Form.Control
											type='text'
											className='form-control form-control-sm'
											id='lastName'
											onChange={(e) => {
												this.setState({ lastName: e.target.value, lastNameError: '' });
											}}
											value={this.state.lastName}
										/>
										<small className='text-danger'>{this.state.lastNameError}</small>
									</div>

									{/* age */}
									<div className='mb-3'>
										<Form.Label htmlFor='age' className='form-label'>
											Age
										</Form.Label>
										<Form.Control
											type='text'
											className='form-control form-control-sm'
											id='age'
											onChange={(e) => {
												this.setState({ age: e.target.value, ageError: '' });
											}}
											value={this.state.age}
										/>
										<small className='text-danger'>{this.state.ageError}</small>
									</div>

									{/* dateOfJoining */}
									<div className='mb-3'>
										<Form.Label htmlFor='dateOfJoining' className='form-label'>
											dateOfJoining
										</Form.Label>
										<Form.Control
											type='date'
											className='form-control form-control-sm'
											id='dateOfJoining'
											onChange={(e) => {
												let date = new Date(e.target.value);
												date = date.toISOString().substring(0, 10);
												console.log(date);
												this.setState({ dateOfJoining: date, dateOfJoiningError: '' });
											}}
											value={this.state.dateOfJoining}
										/>
										<small className='text-danger'>{this.state.dateOfJoiningError}</small>
									</div>

									{/* title */}
									<div className='mb-3'>
										<Form.Label htmlFor='title' className='form-label'>
											Title
										</Form.Label>
										<Form.Select 
											className="form-select"
											id='title'
											onChange={(e) => {
												this.setState({ title: e.target.value, titleError: '' });
											}}
											value={this.state.title}
										>
											<option value="Employee" defaultValue="Employee">Employee</option>
											<option value="Manager">Manager</option>
											<option value="Director">Director</option>
											<option value="VP">VP</option>
										</Form.Select>
										<small className='text-danger'>{this.state.titleError}</small>
									</div>

									{/* department */}
									<div className='mb-3'>
										<Form.Label htmlFor='department' className='form-label'>
											Department
										</Form.Label>
										<Form.Select 
											className="form-select"
											id='department'
											onChange={(e) => {
												this.setState({ department: e.target.value, departmentError: '' });
											}}
											value={this.state.department}
										>
											<option value="IT" defaultValue="IT">IT</option>
											<option value="Marketing">Marketing</option>
											<option value="HR">HR</option>
											<option value="Engineering">Engineering</option>
										</Form.Select>
										<small className='text-danger'>{this.state.departmentError}</small>
									</div>

									{/* employeeType */}
									<div className='mb-3'>
										<Form.Label htmlFor='employeeType' className='form-label'>
											Employee type
										</Form.Label>

										<Form.Select
											className='form-select'
											aria-label='Select employee type'
											id='employeeType'
											value={this.state.employeeType}
											onChange={(e) => {
												this.setState({ employeeType: e.target.value });
											}}>
											<option value='FullTimeEmployee'>Full time employee</option>
											<option value='PartTimeEmployee'>Part time employee</option>
											<option value='ConractEmployee'>Contract employee</option>
											<option value='SeasonalEmployee'>Seasonal employee</option>
										</Form.Select>
										<small className='text-danger'>{this.state.employeeTypeError}</small>
									</div>

									{/* currentStatus */}
									<div className='mb-3 form-check'>
										<Form.Check
											inline
											label='Working currently'
											name='currentStatus'
											type={'checkbox'}
											className='ps-0'
											id='currentStatus'
											checked={this.state.currentStatus}
											onChange={(e) => {
												console.log(e.target.checked);
												this.setState({ currentStatus: e.target.checked });
											}}
										/>
									</div>

									<Button type='submit' className='btn btn-primary'>
										Submit
									</Button>
								</Form>
							</CardBody>

						</Card>
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}
