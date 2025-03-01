package tdck.backend.embytelegramminiapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmbyTelegramMiniappApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmbyTelegramMiniappApplication.class, args);
	}
//	控制台打印一个hello
	private static void printHello() {
		System.out.println("hello");
	}
}
