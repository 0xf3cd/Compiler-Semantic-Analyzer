@.wstr = private unnamed_addr constant [4 x i8] c"%d\0A\00", align 1
@.rstr = private unnamed_addr constant [3 x i8] c"%d\00", align 1

@input = common global i32 0

declare i32 @printf(i8*, ...)
declare i32 @scanf(i8*, ...)

define i32 @read() {
    %tmp1 = call i32 (i8*, ...) @scanf(i8* getelementptr inbounds ([3 x i8], [3 x i8]* @.rstr, i32 0, i32 0), i32* @input)
    %tmp2 = load i32, i32* @input
    ret i32 %tmp2
}

define void @write(i32 %a) {
    %tmp1 = call i32 (i8*, ...) @printf(i8* getelementptr inbounds ([4 x i8], [4 x i8]* @.wstr, i32 0, i32 0), i32 %a)
    ret void
}

;%4 = icmp sle i32 %3, 1;sgt > sge >=  slt < sle <= eq == ne !=


define i32 @main() {
    %tmp1 = call i32 @read()
    %tmp2 = icmp eq i32 %tmp1, 100
    br i1 %tmp2, label %cmpEq, label %cmpNe

cmpEq:
    call void @write(i32 1)
    br label %cmpFinal

cmpNe:
    call void @write(i32 2)
    br label %cmpFinal

cmpFinal:
    

    ret i32 0
}