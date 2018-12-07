target datalayout = "e-m:o-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-apple-macosx10.14.0"

@.str = private unnamed_addr constant [3 x i8] c"%f\00", align 1
@.str.1 = private unnamed_addr constant [3 x i8] c"%d\00", align 1
@.str.2 = private unnamed_addr constant [3 x i8] c"%c\00", align 1

; Function Attrs: noinline nounwind optnone ssp uwtable
define float @readf() #0 {
  %1 = alloca float, align 4
  %2 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([3 x i8], [3 x i8]* @.str, i32 0, i32 0), float* %1)
  %3 = load float, float* %1, align 4
  ret float %3
}

declare i32 @scanf(i8*, ...) #1

; Function Attrs: noinline nounwind optnone ssp uwtable
define void @writef(float) #0 {
  %2 = alloca float, align 4
  store float %0, float* %2, align 4
  %3 = load float, float* %2, align 4
  %4 = fpext float %3 to double
  %5 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([3 x i8], [3 x i8]* @.str, i32 0, i32 0), double %4)
  ret void
}

declare i32 @printf(i8*, ...) #1

; Function Attrs: noinline nounwind optnone ssp uwtable
define i32 @readi() #0 {
  %1 = alloca i32, align 4
  %2 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([3 x i8], [3 x i8]* @.str.1, i32 0, i32 0), i32* %1)
  %3 = load i32, i32* %1, align 4
  ret i32 %3
}

; Function Attrs: noinline nounwind optnone ssp uwtable
define void @writei(i32) #0 {
  %2 = alloca i32, align 4
  store i32 %0, i32* %2, align 4
  %3 = load i32, i32* %2, align 4
  %4 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([3 x i8], [3 x i8]* @.str.1, i32 0, i32 0), i32 %3)
  ret void
}

; Function Attrs: noinline nounwind optnone ssp uwtable
define i32 @readc() #0 {
  %1 = alloca i8, align 1
  %2 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([3 x i8], [3 x i8]* @.str.2, i32 0, i32 0), i8* %1)
  %3 = load i8, i8* %1, align 1
  %4 = sext i8 %3 to i32
  ret i32 %4
}

; Function Attrs: noinline nounwind optnone ssp uwtable
define void @writec(i32) #0 {
  %2 = alloca i32, align 4
  store i32 %0, i32* %2, align 4
  %3 = load i32, i32* %2, align 4
  %4 = trunc i32 %3 to i8
  %5 = sext i8 %4 to i32
  %6 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([3 x i8], [3 x i8]* @.str.2, i32 0, i32 0), i32 %5)
  ret void
}

; Function Attrs: noinline nounwind optnone ssp uwtable
define i32 @ftoi(i32) #0 {
  %2 = alloca i32, align 4
  store i32 %0, i32* %2, align 4
  %3 = load i32, i32* %2, align 4
  ret i32 %3
}

; Function Attrs: noinline nounwind optnone ssp uwtable
define float @itof(i32) #0 {
  %2 = alloca i32, align 4
  store i32 %0, i32* %2, align 4
  %3 = load i32, i32* %2, align 4
  %4 = sitofp i32 %3 to float
  ret float %4
}

attributes #0 = { noinline nounwind optnone ssp uwtable "correctly-rounded-divide-sqrt-fp-math"="false" "disable-tail-calls"="false" "less-precise-fpmad"="false" "no-frame-pointer-elim"="true" "no-frame-pointer-elim-non-leaf" "no-infs-fp-math"="false" "no-jump-tables"="false" "no-nans-fp-math"="false" "no-signed-zeros-fp-math"="false" "no-trapping-math"="false" "stack-protector-buffer-size"="8" "target-cpu"="penryn" "target-features"="+cx16,+fxsr,+mmx,+sahf,+sse,+sse2,+sse3,+sse4.1,+ssse3,+x87" "unsafe-fp-math"="false" "use-soft-float"="false" }
attributes #1 = { "correctly-rounded-divide-sqrt-fp-math"="false" "disable-tail-calls"="false" "less-precise-fpmad"="false" "no-frame-pointer-elim"="true" "no-frame-pointer-elim-non-leaf" "no-infs-fp-math"="false" "no-nans-fp-math"="false" "no-signed-zeros-fp-math"="false" "no-trapping-math"="false" "stack-protector-buffer-size"="8" "target-cpu"="penryn" "target-features"="+cx16,+fxsr,+mmx,+sahf,+sse,+sse2,+sse3,+sse4.1,+ssse3,+x87" "unsafe-fp-math"="false" "use-soft-float"="false" }

!llvm.module.flags = !{!0, !1}
!llvm.ident = !{!2}

!0 = !{i32 1, !"wchar_size", i32 4}
!1 = !{i32 7, !"PIC Level", i32 2}
!2 = !{!"Apple LLVM version 10.0.0 (clang-1000.11.45.5)"}



; head end

@b = global i32 -20
@c = global i32 2
define i32 @calcSum(i32, i32) {
%s = alloca i32
store i32 %0, i32* %s
%e = alloca i32
store i32 %1, i32* %e
%sum = alloca i32
store i32 0, i32* %sum
%tmp0 = load i32, i32* %s
%i = alloca i32
store i32 %tmp0, i32* %i
br label %L3
L3:
%tmp1 = load i32, i32* %i
%tmp2 = load i32, i32* %e
%tmp3 = icmp sle i32 %tmp1, %tmp2
%tmp4 = alloca i32
br i1 %tmp3, label %L0, label %L1
L0:
store i32 1, i32* %tmp4
br label %L2
L1:
store i32 0, i32* %tmp4
br label %L2
L2:
%tmp5 = load i32, i32* %tmp4
br label %L4
L4:
%tmp11 = icmp eq i32 %tmp5, 1
br i1 %tmp11, label %L5, label %L6
L5:
%tmp6 = load i32, i32* %sum
%tmp7 = load i32, i32* %i
%tmp8 = add i32 %tmp6, %tmp7
store i32 %tmp8, i32* %sum
%tmp9 = load i32, i32* %i
%tmp10 = add i32 %tmp9, 1
store i32 %tmp10, i32* %i
br label %L3
L6:
%tmp12 = load i32, i32* %sum
ret i32 %tmp12
}
define i32 @getStart() {
call void @writec(i32 83)
call void @writec(i32 116)
call void @writec(i32 97)
call void @writec(i32 114)
call void @writec(i32 116)
call void @writec(i32 58)
call void @writec(i32 32)
%tmp13 = call i32 @readi()
ret i32 %tmp13
}
define i32 @getEnd() {
call void @writec(i32 69)
call void @writec(i32 110)
call void @writec(i32 100)
call void @writec(i32 58)
call void @writec(i32 32)
%tmp14 = call i32 @readi()
ret i32 %tmp14
}
define void @printTheSum(i32) {
%result = alloca i32
store i32 %0, i32* %result
call void @writec(i32 10)
call void @writec(i32 65)
call void @writec(i32 110)
call void @writec(i32 115)
call void @writec(i32 119)
call void @writec(i32 101)
call void @writec(i32 114)
call void @writec(i32 58)
call void @writec(i32 32)
%tmp15 = load i32, i32* %result
call void @writei(i32 %tmp15)
call void @writec(i32 10)
ret void
}
define i32 @main() {
%tmp16 = call i32 @getStart()
%user_s = alloca i32
store i32 %tmp16, i32* %user_s
%tmp17 = call i32 @getEnd()
%user_e = alloca i32
store i32 %tmp17, i32* %user_e
%tmp18 = load i32, i32* %user_s
%tmp19 = load i32, i32* %user_e
%tmp20 = call i32 @calcSum(i32 %tmp18, i32 %tmp19)
%result = alloca i32
store i32 %tmp20, i32* %result
%tmp21 = load i32, i32* %result
call void @printTheSum(i32 %tmp21)
ret i32 0
}
