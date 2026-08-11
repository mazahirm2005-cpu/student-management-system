export function middleware(request) {

    console.log("Middleware running:", request.nextUrl.pathname);

    const path = request.nextUrl.pathname;
    const role = request.cookies.get("role")?.value;

    console.log("Role:", role);


    if(path.startsWith("/students")){

        if(role !== "ADMIN"){

            return NextResponse.redirect(
                new URL("/", request.url)
            );

        }
    }


    if(path.startsWith("/admin")){

        if(role !== "ADMIN"){

            return NextResponse.redirect(
                new URL("/", request.url)
            );

        }
    }


    return NextResponse.next();
}