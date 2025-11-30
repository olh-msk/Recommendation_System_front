import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function StudentForm({ onSubmit }: { onSubmit: () => void }) {
  const [fullName, setFullName] = useState('');
  const [gpa, setGpa] = useState<number>(3.0);
  const [interests, setInterests] = useState<number[]>([]);
  const [availableTags, setAvailableTags] = useState<InterestTagDto[]>([]);
  const [role, setRole] = useState<'Student' | 'Teacher'>('Student');

  useEffect(() => {
    getInterestTags()
      .then(setAvailableTags)
      .catch(() => setAvailableTags([]));
  }, []);

  const handleSubmit = async () => {
    const dto: CreateStudentDto = {
      fullName,
      gpa,
      interestTagIds: interests,
      role,
    };
    try {
      await registerStudent(dto);
      onSubmit();
    } catch (err) {
      console.error('Registration failed', err);
      alert('Не вдалося створити користувача');
    }
  };

  return (
    <Paper sx={{ p: 3 }} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Реєстрація
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Повне ім’я"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
        />

        <TextField
          label="GPA"
          type="number"
          inputProps={{ step: 0.01 }}
          value={gpa}
          onChange={(e) => setGpa(parseFloat(e.target.value))}
        />

        <FormControl fullWidth>
          <InputLabel id="role-label">Роль</InputLabel>
          <Select
            labelId="role-label"
            value={role}
            label="Роль"
            onChange={(e) => setRole(e.target.value as any)}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Teacher">Teacher</MenuItem>
          </Select>
        </FormControl>

        <div>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Інтереси
          </Typography>
          <FormGroup row>
            {availableTags.map((tag) => (
              <FormControlLabel
                key={tag.id}
                control={
                  <Checkbox
                    checked={interests.includes(tag.id)}
                    onChange={() => {
                      setInterests((prev) =>
                        prev.includes(tag.id)
                          ? prev.filter((id) => id !== tag.id)
                          : [...prev, tag.id]
                      );
                    }}
                  />
                }
                label={tag.name}
              />
            ))}
          </FormGroup>
        </div>

        <Button variant="contained" onClick={handleSubmit}>
          Створити
        </Button>
      </Stack>
    </Paper>
  );
}
