import 'date-fns';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import APP_CONSTANTS from '../../constants'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import {withStyles} from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
});


class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dateOfBirth: new Date(),
            salary: '',
            skills: [
                {
                    'skillName': 'Java',
                    'isChecked': false,
                },
                {
                    'skillName': 'Angular',
                    'isChecked': false,
                },
                {
                    'skillName': 'React',
                    'isChecked': false,
                },
                {
                    'skillName': 'MongoDb',
                    'isChecked': false
                }
            ],
            profile_image_url: '',
            completed: false,
            is_uploading: false
        }
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDateOfBirth = (date) => {
        this.setState({
            dateOfBirth: date
        });
    }

    onChangeSalary = (e) => {
        this.setState({
            salary: e.target.value
        });
    }

    onChangeSkills = (index) => (e) => {

        let skill = this.state.skills[index];
        skill.isChecked = e.target.checked;

        let skills = this.state.skills.slice();
        skills[index] = skill

        this.setState({
            skills: skills
        });
    }

    onChangeProfilePic = (e) => {
        let file = e.target.files[0];
        let fd = new FormData();
        fd.append("image", file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        this.setState({
            is_uploading: true
        })
        axios.post(APP_CONSTANTS.SERVER_URL + "/images/upload", fd, config).then(res => {
            this.setState({
                profile_image_url: res.data.imagePath,
                is_uploading: false
            });

        }).catch(error => {
            console.log("error : ", error)
            this.setState({
                is_uploading: false
            });
        })
    }

    renderSkills = () => {
        const {classes} = this.props;
        return (
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    {this.state.skills.map((skill, index) => {
                        return (<FormControlLabel key={index}
                                                  control={<Checkbox key={skill.skillName + "_" + index}
                                                                     checked={skill.isChecked}
                                                                     onChange={this.onChangeSkills(index)}
                                                                     value={skill.skillName}/>}
                                                  label={skill.skillName}
                        />)
                    })
                    }
                </FormGroup>
            </FormControl>
        )
    }

    onSubmit = (e) => {
        e.preventDefault();
        const employee = {
            name: this.state.name,
            dateOfBirth: this.state.dateOfBirth,
            salary: this.state.salary,
            skills: APP_CONSTANTS.SKILLS,
            profile_image_url: this.state.profile_image_url,
        }
        console.log(`Form submitted: ${JSON.stringify(employee)}`);
        axios.post(APP_CONSTANTS.SERVER_URL + '/employees/add', employee)
            .then(res => console.log(res.data));

        this.setState({
            completed: false
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <div style={{marginTop: 20}}>
                <h3>Add New Employee</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.name}
                               onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date Of Birth: </label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="flex-start">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={this.state.dateOfBirth}
                                    onChange={this.onChangeDateOfBirth}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date of birth',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>

                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.salary}
                               onChange={this.onChangeSalary}
                        />
                    </div>

                    <div className={classes.root}>
                        <label>Skills: </label>
                        {this.renderSkills()}

                    </div>

                    <div className="form-group">
                        <label>Profile Pic Upload: </label>
                        <input type="file" name="image"
                               className="form-control"
                               onChange={this.onChangeProfilePic}
                        />
                        {this.state.is_uploading && <span>Image Uploading</span>}
                    </div>

                    <div className="form-group">
                        <label>Profile Pic : </label>
                        <img
                            src={APP_CONSTANTS.SERVER_URL + "/images/" + this.state.profile_image_url}
                        />

                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add New Employee" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

AddEmployee.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AddEmployee)