private input []

//left
thread new thread(new runnable (){
    void run{
        mergesort(input, start, end) 
    }
})

//right
thread2 new thread(new runnable (){
    void run{
        mergesort(input, start, end) 
    }
})

join(t1, t2)



