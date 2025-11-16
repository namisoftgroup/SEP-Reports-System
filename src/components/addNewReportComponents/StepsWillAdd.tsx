import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

const StepsWillAdd = ({ steps, currentStep }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{steps[currentStep - 1].label}</CardTitle>
        <CardDescription>
          Content for step {currentStep} goes here...
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Form fields for this step will be added here.
        </p>
      </CardContent>
    </Card>
  );
};

export default StepsWillAdd;
