"use client";
import { useState, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";



interface BmiResult {
    bmi: string;
    category: string;
  }


  export default function BmiCalculator() {

const [height,setHeight]=useState<string>("")
const [weight,setWeight]=useState<string>("")
const [result,setResult]=useState<BmiResult|null>(null)
const [error,setError]=useState<string>("")


const handleHeightchange=(e:ChangeEvent<HTMLInputElement>):void=>{
setHeight(e.target.value)
}

const handleWeightchange=(e:ChangeEvent<HTMLInputElement>):void=>{
    setWeight(e.target.value)
    }

    const calculateBmi=()=>{
        if(!height||!weight){
            setError("Please enter height weight to calculate BMI");
            return
        }

        const heightInmeters=parseFloat(height)/100

        if(heightInmeters<=0){
            setError("Height must be a positive number")
            return
        }
const weightInKg=parseFloat(weight)
if(weightInKg<=0){
    setError("Weight must be a postive number")
return
}
const bmiValue=weightInKg/(heightInmeters*heightInmeters)
let category=""
if(bmiValue<18.5){
    category="Underweight"
}else if (bmiValue >= 18.5 && bmiValue < 25) {
    category = "Normal";
  } else if (bmiValue >= 25 && bmiValue < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }
setResult({bmi:bmiValue.toFixed(2),category:category})
setError("")
    }

    return(
        <>

        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#ac9f9f8f] to-[#456272]">
            <Card className="w-full max-w-md">
<CardHeader>
  <CardTitle className="text-2xl font-bold">BMI Calculator</CardTitle>
  <CardDescription>Enter your height weight to calculate your BMI</CardDescription>
</CardHeader>

<CardContent>
  <div className="space-y-3">
<div className="space-y-1">
<Label className="font-bold">Height(cm)</Label>
<Input
onChange={handleHeightchange}
type="number"
value={height}
placeholder="Enter your height"
/>
</div>

<div className="space-y-1">
<Label className="font-bold">Weight(kg)</Label>
<Input
onChange={handleWeightchange}
type="number"
value={weight}
placeholder="Enter your Weight"
/>
</div>

<Button
onClick={calculateBmi}>
  Calculate
</Button>

{error && <div className="text-red-600 text-center ">{error}</div> }

{result && (
  <div >
    <div className="text-center font-bold text-2xl">{result.bmi}</div>
    <div className="text-center font-bold text-muted-foreground">{result.category}</div>
  </div>
)}
  </div>
</CardContent>
</Card>
        </div>
        </>
    )
  }