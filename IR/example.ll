target datalayout = "e-m:o-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-apple-macosx10.14.0"
@.wistr = private unnamed_addr constant [4 x i8] c"%d\0A\00", align 1
@.ristr = private unnamed_addr constant [3 x i8] c"%d\00", align 1
@.wfstr = private unnamed_addr constant [4 x i8] c"%f\0A\00", align 1
@.rfstr = private unnamed_addr constant [3 x i8] c"%f\00", align 1

@inputf = common global float 0.000000e+00
@inputi = common global i32 0
@test = global i32 100

declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

define float @readf() {
    %tmp1 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([3 x i8], [3 x i8]* @.rfstr, i32 0, i32 0), float* @inputf)
    %tmp2 = load float, float* @inputf
    ret float %tmp2
}

define void @writef(float %f) {
    %tmp1 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.wfstr, i32 0, i32 0), float %f)
    ret void
}


define i32 @readi() {
    %tmp1 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([3 x i8], [3 x i8]* @.ristr, i32 0, i32 0), i32* @inputi)
    %tmp2 = load i32, i32* @inputi
    ret i32 %tmp2
}

define void @writei(i32 %i) {
    %tmp1 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.wistr, i32 0, i32 0), i32 %i)
    ret void
}

define i32 @ftoi(float) {
    %2 = alloca float
    store float %0, float* %2
    %3 = load float, float* %2
    %4 = fptosi float %3 to i32
    ret i32 %4
}

define float @itof(i32) {
    %2 = alloca i32
    store i32 %0, i32* %2
    %3 = load i32, i32* %2
    %4 = sitofp i32 %3 to float
    ret float %4
}

;%4 = icmp sle i32 %3, 1;sgt > sge >=  slt < sle <= eq == ne !=
; fcmp ogt> oge>= olt< ole<= oeq== une!=
define i32 @main() {
    %tmp1 = call i32 @readi()
    %tmp2 = icmp eq i32 %tmp1, 100
    br i1 %tmp2, label %cmpEq, label %cmpNe

cmpEq:
    call void @writei(i32 1)
    br label %cmpFinal

cmpNe:
    call void @writei(i32 %tmp1)
    br label %cmpFinal

cmpFinal:
    
    ret i32 0
}